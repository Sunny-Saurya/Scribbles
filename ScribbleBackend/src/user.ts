import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings, Variables } from "hono/types";
import {decode, sign, verify} from 'hono/jwt';
import { signinInput, signupInput } from "@sunny_kumar766/medium-common";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL : string;
      JWT_SECRET : string;
    }
}>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            error: "Invalid inputs"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try{
    const user = await prisma.user.create({
      data:{
        username : body.username,
        password : body.password,
        name : body.name
  
      }
    })
    const jwt = await sign({
      id : user.id
    }, c.env.JWT_SECRET);
    return c.text("Signed Up! "+ "Jwt token : " + jwt);
    }
    catch(e){
      c.status(411);
      return c.text('User already exists with this email');
    }
  
  });
  
  userRouter.post("/signin", async (c) => {
  
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try{
    const user = await prisma.user.findFirst({
      where:{
        username : body.username,
        password : body.password,
        name : body.name
  
      }
    })
    if(!user){
      c.status(403);  // status code is for unauthorized 
      return c.text('User does not exist');
    }
  
    if (user.password !== body.password) {
      c.status(401);  // Unauthorized
      return c.text("Invalid credentials");
    }
  
    if(user.username != body.username){
      c.status(403);  // status code is for unauthorized
      return c.text('Incorrect username');
    }
  
    const jwt = await sign({
      id : user.id
    }, c.env.JWT_SECRET);
    return c.text("Signed in! "+ "Jwt token : " + jwt);
    }
    catch(e){
      c.status(411);
      return c.text('User already exists with this email');
    }
  });