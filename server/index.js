const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors());
config();

mongoose.connect(process.env.MONGOURL, { dbName: "ecommerce-platform", connectTimeoutMS: 30000 })
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const authRouter = require("./routes/auth")
const sellersAuthRouter = require("./routes/sellersAuth")

const adminDashboardRouter = require("./routes/adminDashboard");
const adminUsersRouter = require("./routes/adminUsers")
const adminSellerRequestsRouter = require("./routes/adminSellerRequests")
const adminSellerListRouter = require("./routes/adminSellerList")
const adminDomainsRouter = require("./routes/adminDomains")
const contactMessagesRouter = require("./routes/contactMessages");

const sellerDashboardRouter = require("./routes/sellerDashboard")
const sellerMenusRouter = require("./routes/sellerMenus")
const sellerPagesRouter = require("./routes/sellerPages")
const sellerSaleRouter = require("./routes/sellerSale")
const sellerCouponsRouter = require("./routes/sellerCoupons")
const sellerFaqsRouter = require("./routes/sellerFaqs")
const sellerAddProductRouter = require("./routes/sellerAddProduct")
const sellerManageProductsRouter = require("./routes/sellerManageProducts")
const sellerEditProductRouter = require("./routes/sellerEditProduct")
const sellerCategoriesRouter = require("./routes/sellerCategories")
const sellerSizeChartsRouter = require("./routes/sellerSizeCharts")
const sellerImageGalleryRouter = require("./routes/sellerImageGallery")
const sellerThemeSettingsRouter = require("./routes/sellerThemeSettings")
const sellerLayoutSettingsRouter = require("./routes/sellerLayoutSettings")
const sellerProductPageLayoutSettingsRouter = require("./routes/sellerProductPageLayoutSettings")
const sellerContentSettingsRouter = require("./routes/sellerContentSettings")
const sellerHeaderContentSettingsRouter = require("./routes/sellerHeaderContentSettings")
const sellerFooterContentSettingsRouter = require("./routes/sellerFooterContentSettings")
const sellerManageOrdersRouter = require("./routes/sellerManageOrders")
const sellerUpdateOrderRouter = require("./routes/sellerUpdateOrder")
const sellerDeliveryDateEstimateRouter = require("./routes/sellerDeliveryDateEstimate")
const sellerManagePaymentsRouter = require("./routes/sellerManagePayments")
const sellerChargesAndMethodsRouter = require("./routes/sellerChargesAndMethods")
const sellerProfileRouter = require("./routes/sellerProfile")
const sellerDomainRouter = require("./routes/sellerDomain")
const sellerTagsManagerRouter = require("./routes/sellerTagsManager")
const subscriptionsRouter = require("./routes/subscriptions");

const fetchSellerDetailsRouter = require("./routes/fetchSellerDetails")
const platformHomeRouter = require("./routes/platformHome")
const platformPagesRouter = require("./routes/platformPages")
const platformProductsRouter = require("./routes/platformProducts")
const productPageRouter = require("./routes/productPage")
const platformCartRouter = require("./routes/platformCart")
const platformCouponsRouter = require("./routes/platformCoupons")
const platformPlaceOrderRouter = require("./routes/placeOrder")

const userDashboardRouter = require("./routes/userDashboard")
const userOrdersRouter = require("./routes/userOrders")
const userProfileRouter = require("./routes/userProfile")
const userAddressRouter = require("./routes/userAddress")
const userReviewsRouter = require("./routes/userReviews")
const userFavouritesRouter = require("./routes/favourites")

app.use("/auth", authRouter)
app.use("/auth/seller", sellersAuthRouter)

app.use("/admin/dashboard", adminDashboardRouter);
app.use("/admin/users", adminUsersRouter)
app.use("/admin/sellers/requests", adminSellerRequestsRouter)
app.use("/admin/sellers/list", adminSellerListRouter)
app.use("/admin/domains", adminDomainsRouter)
app.use("/contact-messages", contactMessagesRouter)

app.use("/seller/dashboard", sellerDashboardRouter)
app.use("/seller/menus", sellerMenusRouter)
app.use("/seller/pages", sellerPagesRouter)
app.use("/seller/sale", sellerSaleRouter)
app.use("/seller/coupons", sellerCouponsRouter)
app.use("/seller/faqs", sellerFaqsRouter)
app.use("/seller/add-product", sellerAddProductRouter)
app.use("/seller/manage-products", sellerManageProductsRouter)
app.use("/seller/edit-product", sellerEditProductRouter)
app.use("/seller/categories", sellerCategoriesRouter)
app.use("/seller/size-charts", sellerSizeChartsRouter)
app.use("/seller/image-gallery", sellerImageGalleryRouter)
app.use("/seller/theme", sellerThemeSettingsRouter)
app.use("/seller/layout", sellerLayoutSettingsRouter)
app.use("/seller/product-page-layout", sellerProductPageLayoutSettingsRouter)
app.use("/seller/content", sellerContentSettingsRouter)
app.use("/seller/header-content", sellerHeaderContentSettingsRouter)
app.use("/seller/footer-content", sellerFooterContentSettingsRouter)
app.use("/seller/manage-orders", sellerManageOrdersRouter)
app.use("/seller/update-order", sellerUpdateOrderRouter)
app.use("/seller/delivery-date-estimate", sellerDeliveryDateEstimateRouter)
app.use("/seller/manage-payments", sellerManagePaymentsRouter)
app.use("/seller/charges-and-methods", sellerChargesAndMethodsRouter)
app.use("/seller/profile", sellerProfileRouter)
app.use("/seller/domain", sellerDomainRouter)
app.use("/seller/tags-manager", sellerTagsManagerRouter)
app.use("/subscriptions", subscriptionsRouter);

app.use("/platform/seller-settings", fetchSellerDetailsRouter)
app.use("/platform/home", platformHomeRouter)
app.use("/platform/pages", platformPagesRouter)
app.use("/platform/products", platformProductsRouter)
app.use("/platform/product", productPageRouter)
app.use("/platform/cart", platformCartRouter)
app.use("/platform/coupons", platformCouponsRouter)
app.use("/platform/order", platformPlaceOrderRouter)

app.use("/user/dashboard", userDashboardRouter)
app.use("/user/orders", userOrdersRouter)
app.use("/user/profile", userProfileRouter)
app.use("/user/address", userAddressRouter)
app.use("/user/reviews", userReviewsRouter)
app.use("/user/favourites", userFavouritesRouter)
app.use("/uploads", express.static("uploads"))

// const authModel = require("./models/auth");

// app.get("/", async (req, res) => {
//     try {
//         // const result = await authModel.updateMany(
//         //     { "place": { $exists: false }, },
//         //     { $set: { "place": null, } }
//         // );

//         // const result = await authModel.updateMany(
//         //     {
//         //         $or: [
//         //             { cart: { $exists: true } },
//         //             { favourites: { $exists: true } },
//         //         ],
//         //     },
//         //     {
//         //         $set: {
//         //             cart: [],
//         //             favourites: [],
//         //         },
//         //     }
//         // );

//         res.json({ message: `Updated ${result.modifiedCount} documents` });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });