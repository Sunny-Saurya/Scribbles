import z from "zod"

export const signupInput = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().optional()

})


export const signinInput = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    
    
})

export const createdBlogInput = z.object({
    title: z.string().min(3, { message: "Title must be at least of 3 characters" }),
    content: z.string().min(3, { message: "Content must be at least of 3 characters " }),
})


export const updatedBlogInput = z.object({
    title: z.string().min(3, { message: "Title must be at least of 3 characters" }),
    content: z.string().min(3, { message: "Content must be at least of 3 characters " }),
    id: z.number()
})

export type SignupInput = z.infer<typeof signupInput> 
export type SigninInput = z.infer<typeof signinInput> 
export type CreatedBlogInput = z.infer<typeof createdBlogInput>
export type UpdatedBlogInput = z.infer<typeof updatedBlogInput>


