const express = require("express");
const {
  createProject,
  getProject,
  getProjects,
  deleteProject,
  updateProject,
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
  getProgress,
  createProgress,
  updateProgress,
} = require("../controllers/projectController");

const router = express.Router();

//GET ALL PROJECTS
router.get("/", getProjects);

//GET SINGLE PROJECT
router.get("/:id", getProject);

//POST A NEW PROJECT
router.post("/", createProject);
//DELETE A PROJECT
router.delete("/:id", deleteProject);
//UPDATE A PROJECT
router.patch("/:id", updateProject);
//GET ALL NOTES
router.get("/:id/notes", getNotes);

//GET SINGLE NOTES
router.get("/:id/notes/:noteId", getNote);
//CREATE A NOTE
router.put("/:id/notes", createNote);
//DELETE A NOTE
router.delete("/:id/notes/:noteId", deleteNote);
//UPDATE A NOTE
router.patch("/:id/notes/:noteId", updateNote);
//GET ALL PROGRESS
router.get("/:id/progress", getProgress);
//CREATE A PROGRESS
router.put("/:id/progress", createProgress);
//UPDATE A PROGRESS
router.patch("/:id/progress/:progressId", updateProgress);
module.exports = router;
