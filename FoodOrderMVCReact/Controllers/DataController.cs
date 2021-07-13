using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodOrderMVCReact.Models;

namespace FoodOrderMVCReact.Controllers
{
    public class DataController : Controller
    {
        public IList<FoodItem> menuItems;
        // GET: Data
        [HttpGet]
        public ActionResult GetMenuList()
        {
            menuItems = new List<FoodItem>();
            using (var db = new AppDbContext())
            {
                foreach (var f in db.FoodItems)
                {
                    menuItems.Add(f);
                }
            }

            return Json(menuItems, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public string GetUserId()
        {
            int uid = -1;
            if (Session["UserId"] != null)
            {
                uid = Convert.ToInt32(Session["UserId"].ToString());
            }
            return uid.ToString();
        }

        [HttpPost]
        public ActionResult PlaceOrder(IList<FoodItem> items, int id)
        {
            bool dbSuccess = false;

            try
            {
                using (var db = new AppDbContext())
                {
                    Order o = new Order();
                    o.CustomerId = id;
                    o.OrderDate = DateTime.Now;

                    db.Orders.Add(o);
                    db.SaveChanges();

                    int orderId = o.Id;
                    decimal grandTotal = 0;
                    foreach (var f in items)
                    {
                        var orderDetail = new OrderDetail()
                        {
                            OrderId = orderId,
                            FoodItemId = f.Id,
                            Quantity = f.Quantity,
                            TotalPrice = f.Price * f.Quantity
                        };
                        db.OrderDetails.Add(orderDetail);
                        grandTotal += orderDetail.TotalPrice;
                    }

                    o.TotalPaid = grandTotal;
                    o.Status = 1;
                    o.OrderDate = DateTime.Now;
                    db.SaveChanges();
                    dbSuccess = true;
                }
            }
            catch (Exception e)
            {
                dbSuccess = false;
            }

            return dbSuccess
                ? Json("success: true", JsonRequestBehavior.AllowGet)
                : Json("success: false", JsonRequestBehavior.AllowGet);

        }
    }
}