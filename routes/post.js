const express = require("express");
const { Post } = require("../models/post");
const excel = require("exceljs");
const PostRoutes = express.Router();

PostRoutes.get("/posts/:userId", async (req, res) => {
  try {
    const postUserId = req.params.userId;
    const data = await Post.findAll({
      where: {
        user_id: postUserId,
      },
    });
    res.status(200).json({
      message: "Posts saved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error from PostRoutes.post",
      error: error.message,
    });
  }
});

PostRoutes.post("/posts", async (req, res) => {
  try {
    const postData = req.body;
    const postDetails = await Post.bulkCreate(postData);

    // Send response after bulk creation
    res.status(200).json({
      message: "Posts saved successfully",
      data: postDetails,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error from PostRoutes.post",
      error: error.message,
    });
  }
});

const fetchUserPosts = async (userId) => {
  const userPosts = await Post.findAll({
    where: {
      user_id: userId,
    },
  });
  return userPosts;
};

// Route to download user posts in Excel format
PostRoutes.get("/downloadposts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userPosts = await fetchUserPosts(userId);
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Posts");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Title", key: "title", width: 30 },
      { header: "Body", key: "body", width: 50 },
      { header: "Company", key: "company", width: 20 },
    ];
    userPosts.forEach((post) => {
      worksheet.addRow({
        name: post.name,
        title: post.title,
        body: post.body,
        company: post.company,
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=posts.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = {
  PostRoutes,
};
