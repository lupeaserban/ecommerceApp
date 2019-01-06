
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async createProduct(parent, args, ctx, info) {
    //check if user is logged in
    const product = await ctx.db.mutation.createProduct(
      {
        data: { ...args }
      },
      info
    );
    return product;
  },

  deleteProduct(parent, args, ctx, info) {
    return ctx.db.mutation.deleteProduct(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },

  updateProduct(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateProduct(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },


  async createUser(parent, args, ctx, info) {
    const user = await ctx.db.mutation.createUser(
      {
        data: { ...args }
      },
      info
    );
    return user;
  },

  updateUser(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  deleteUser(parent, args, ctx, info) {
    return ctx.db.mutation.deleteUser(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async signup(parent, args, ctx, info) {
    // lowercase email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the dB
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.PRISMA_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie 
    });
    //return the user to the browser
    return user;
  },
};


module.exports = Mutation;
