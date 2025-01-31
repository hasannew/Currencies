import { db } from "@/app/lib/db";

async function handler() {
  try {
    const newUser = await db.user.create({
      data: {
        username: "qooz",
        email: "email",
        password: "pwd",
        token: "token",
        tokenExpiracy: "2025-01-27T18:37:58.690Z",
        type: "typ",
      },
    });
    console.log(newUser);
    if (newUser)
      return Response.json({ message: "USER CREATED" }, { status: 200 });
    return Response.json("USER NOT CREATED", { status: 401 });
  } catch (e) {
    console.log(`Error: ${e}`);
    return Response.json({ message: "An Error Occured" }, { status: 400 });
  }
}

export { handler as GET, handler as POST };
