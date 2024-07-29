import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@codewithkara/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
  }>();


blogRouter.use("/*", async (c, next) => {
    try {
        const authHeader = c.req.header('authorization') || ""; // Remove error of TypeScript
        const user = await verify(authHeader, c.env.JWT_SECRET);
    
        if (user) {
          //@ts-ignore
          c.set("userId", user.id);
          await next();
        } else {
          c.status(403);
          return c.json({
            message: "You are not logged in"
          });
        }
      } catch (error) {
        c.status(500);
        return c.json({
          message: "Internal server error"
        });
      }
    });

blogRouter.post('/', async (c) => {
    
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({
            message: "Inputs are not correct"
        })

    }

    const authorId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })


        return c.json({
            id: blog.id
        })
    } catch(e){
        c.status(404);
        return c.text('Invalid')
    }
})

blogRouter.put('/', async (c) => {
    
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({
            message: "Inputs are not correct"
        })

    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })


        return c.json({
            id: blog.id
        })
    } catch(e){
        c.status(404);
        return c.text('Invalid')
    }
})

//Todo : add pagination
blogRouter.get('/bulk', async (c) => {

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
    
        return c.json({
            blogs
        })
    } catch(e){
        c.status(404);
        return c.json({
            message: 'Error while fetching blogs'
        })
    }
})

blogRouter.get('/:id', async (c) => {

    
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select:{
                        name: true
                    }
                },
                createdDate: true,
            }
        })


        return c.json({
            blog
        })
    } catch(e){
        c.status(404);
        return c.json({
            message: 'Error while fetching blog post'
        })
    }
})





