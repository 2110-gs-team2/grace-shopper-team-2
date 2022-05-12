<h1 align="center">
  <br>
  <a href="https://gs-poshleaf.herokuapp.com/"><img src="https://gs-poshleaf.herokuapp.com/img/logo.svg" alt="Poshleaf" width="400"></a>
  <br>
  PoshLeaf
  <br>
</h1>

<h4 align="center">A full stack e-commerce site with end-to-end functionality from product browsing to purchasing.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a>
</p>

![screenshot](https://res.cloudinary.com/juliekim0918/image/upload/v1651498104/Screen_Shot_2022-05-02_at_9.28.13_AM_nkww1k.png)

## Key Features

- View all available products and a single product for more details
- Sort and filter products by categories and types
- Add/remove products from cart
- Persist cart for both authenticated and unauthenticated users
- Create an account to view order history and user profile
- Authorize admin users to view/edit product and user information
- Check out items in cart either as a guest or authenticated user

## How To Use

1. Fork and clone the repo
2. `npm install`
3. Create two postgres databases. These commands will create both your **development** and **test** databases

```
createdb grace_shopper_team_2
createdb grace_shopper_team_2-test
```

4. Sync and seed your database by running `npm run seed`
5. Running `npm run start:dev` will make great things happen!

<h4>Other commands</h4>
- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database
