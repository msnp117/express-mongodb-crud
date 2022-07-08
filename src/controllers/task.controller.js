import Task from "../models/Task";

export const renderTasks = async (req, res) => {
  // lean devuelve una lista de objetos tipicos para poder recorrer
  // pasa de devolver objetos de json a objetos js
  const tasks = await Task.find().lean();
  res.render("index", { tasks: tasks });
};

export const createTask = async (req, res) => {
  try {
    const task = Task(req.body);

    // ´save permite añadir a mongodb
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const renderTaskEdit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();

    // se le pasa 'task' como parametro a "edit"
    res.render("edit", { task });
  } catch (error) {
    console.log(error);
  }
};

export const editTask = async (req, res) => {
  // console.log(req.body);
  // el req.body tiene la nueva inforamcion modificada en el fomr edit

  // console.log(req.params.id)

  // (id , nueva informacion)
  await Task.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/");
};

export const deleteTask = async (req, res) => {
  const { id } = req.params; // = const id = req.params.id
  await Task.findByIdAndDelete(id);
  res.redirect("/");
};

export const taskToggleDone = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.done = !task.done;
  await task.save();
  res.redirect("/");
};
