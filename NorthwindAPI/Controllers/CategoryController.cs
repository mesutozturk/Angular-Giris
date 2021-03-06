﻿using NorthwindAPI.Models;
using NorthwindAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NorthwindAPI.Controllers
{
    public class CategoryController : ApiController
    {
        [HttpGet]
        public object GetAllCategories()
        {
            try
            {
                NorthwindEntities db = new NorthwindEntities();
                var model = db.Categories.Select(x => new CategoryViewModel
                {
                    CategoryID = x.CategoryID,
                    CategoryName = x.CategoryName,
                    Description = x.Description
                });
                return new
                {
                    success = true,
                    data = model
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = ex.Message
                };
            }
        }

        [HttpGet]
        public object GetCategoryById(int? id)
        {
            if (id == null)
                return new
                {
                    success = false,
                    message = "id değeri null olamaz"
                };
            try
            {
                NorthwindEntities db = new NorthwindEntities();
                var model = db.Categories.Find(id.Value);
                if (model == null)
                    return new
                    {
                        success = false,
                        message = "Kategori bulunamadı"
                    };
                else
                    return new
                    {
                        success = true,
                        data = new CategoryViewModel
                        {
                            CategoryID = model.CategoryID,
                            CategoryName = model.CategoryName,
                            Description = model.Description
                        }
                    };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = ex.Message
                };
            }
        }
        [HttpPost]
        public object UpdateCategory(CategoryViewModel model)
        {
            try
            {
                NorthwindEntities db = new NorthwindEntities();
                var cat = db.Categories.Find(model.CategoryID);
                cat.CategoryName = model.CategoryName;
                cat.Description = model.Description;
                db.SaveChanges();
                return new
                {
                    success = true
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = ex.Message
                };
            }
        }
        [HttpPost]
        public object NewCategory(CategoryViewModel model)
        {
            try
            {
                NorthwindEntities db = new NorthwindEntities();
                db.Categories.Add(new Category()
                {
                    CategoryName = model.CategoryName,
                    Description = model.Description
                });
                db.SaveChanges();
                return new
                {
                    success = true
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = ex.Message
                };
            }
        }
    }
}
