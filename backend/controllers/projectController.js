const Project = require("../models/projectModel");
const mongoose = require("mongoose");
//get all projects
const getProjects = async (req, res) => {
  const user_id = req.user._id;
  const projects = await Project.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(projects);
};

//get a single project
const getProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }
  res.status(200).json(project);
};
//create a new project
const createProject = async (req, res) => {
  const { title, description, days, totalWorkTime, totalBreakTime, notes } =
    req.body;

  //add doc to db
  try {
    const user_id = req.user._id;
    const project = await Project.create({
      title,
      description,
      days,
      totalWorkTime,
      totalBreakTime,
      notes,
      user_id,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndDelete({ _id: id });
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }
  res.status(200).json(project);
};
//update a project
const updateProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }
  res.status(200).json(project);
};
//get all notes
const getNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "project not found." });
    }

    // Retrieve the notes array from the project
    const notes = project.notes;

    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the notes." });
  }
};

//get a single note
const getNote = async (req, res) => {
  const { id, noteId } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "project not found." });
    }

    // Find the note with the specified noteId
    const note = project.notes.find(
      (note) => note._id.toString() === noteId.toString()
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the note." });
  }
};
//add a note
const createNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }
  //add the note to the array

  project.notes.push({ title, description });

  //save

  await project.save();
  res.json(project);
};
//update a note
const updateNote = async (req, res) => {
  const { id, noteId } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(404).json({ error: "No such note" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }

  // Find the note with the specified noteId
  const note = project.notes.find(
    (note) => note._id.toString() === noteId.toString()
  );

  if (!note) {
    return res.status(404).json({ error: "Note not found." });
  }

  // Update the note properties
  note.title = title;
  note.description = description;

  // Save the updated document
  await project.save();

  res.json(note);
};
//delete a note
const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(404).json({ error: "No such note" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }

  // Find the note in the array and remove it
  const noteIndex = project.notes.findIndex(
    (note) => note._id.toString() === noteId.toString()
  );
  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found." });
  }
  project.notes.splice(noteIndex, 1);

  // Save the updated project
  await project.save();

  res.status(200).json(project);
};

//GET PROGRESS
const getProgress = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "project not found." });
    }

    // Retrieve the notes array from the project
    const notes = project.progress;

    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the notes." });
  }
};
//ADD PROGRESS
const createProgress = async (req, res) => {
  const { id } = req.params;
  const { date, completed, timeWorked } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }
  //add the progress to the array

  project.progress.push({ date, completed, timeWorked });

  //save

  await project.save();
  res.json(project);
};

//update a progress
const updateProgress = async (req, res) => {
  const { id, progressId } = req.params;
  const { timeWorked } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }
  if (!mongoose.Types.ObjectId.isValid(progressId)) {
    return res.status(404).json({ error: "No such progress" });
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ error: "no such project" });
  }

  // Find the progress with the specified progressId
  const progress = project.progress.find(
    (progress) => progress._id.toString() === progressId.toString()
  );

  if (!progress) {
    return res.status(404).json({ error: "Progress not found." });
  }

  // Update the note properties
  progress.timeWorked = timeWorked;

  // Save the updated document
  await project.save();

  res.json(progress);
};
module.exports = {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  createNote,
  deleteNote,
  updateNote,
  getNote,
  getNotes,
  getProgress,
  createProgress,
  updateProgress,
};
