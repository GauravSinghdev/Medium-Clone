import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@codewithkara/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET);
  
      return c.json({
        jwt,
        user
      });
    } catch(e) {
      c.status(411);
      return c.text('Invalid');
    }
})

//new route 
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    if(!body.password) return c.text("missing pass")
    try{
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }
      })
  
      if(!user) {
        c.status(403);
        return c.json({
          message: "Incorrect credentials!"
        })
      }
  
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET);
  
      return c.json({
        jwt,
        user
      });
    } catch(e) {
      c.status(411);
      return c.text('Invalid');
    }
})

userRouter.get('/user-details', async (c) => {
  try{
    const authHeader = c.req.header('authorization') || ""; // Remove error of TypeScript
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(!user)
    {
      c.status(403);
      return c.json({
        message: "not logged in"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const User = await prisma.user.findFirst({
      where: {
          id: Number(user.id)
      },
    })
    
    return c.json({
      User
    })
  } catch(e){
    c.status(411);
    return c.text('Invalid');
  }
})

userRouter.put('/edit-bio', async (c) => {
  console.log("hey")
  try{
    const body = await c.req.json();
    const authHeader = c.req.header('authorization') || ""; // Remove error of TypeScript
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(!user)
    {
      c.status(403);
      return c.json({
        message: "not logged in"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const User = await prisma.user.update({
      where: {
          id: Number(user.id)
      },
      data: {
          bio: body.bio,
      }
    })

  return c.json({
      User
  })

  }catch(e){
    c.status(411);
    return c.text('Invalid');
  }
})

userRouter.delete('/delete', async (c) => {
  try{
    const authHeader = c.req.header('authorization') || ""; // Remove error of TypeScript
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(!user)
    {
      c.status(403);
      return c.json({
        message: "not logged in"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Use Prisma to delete the user by ID
    const result = await prisma.user.delete({
      where: {
        id: Number(user.id), // Assuming ID is a number; adjust if it's a different type
      },
    });

    // Respond with a success message
    c.status(200);
    return c.json({ message: 'User deleted successfully', result });

  }catch(e){
    c.status(411);
    return c.text('Invalid');
  }
})

  