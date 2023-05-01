const sql = require("../../_util/config");

// constructor
const Employee = function(employee) {
  this.date = employee.date;
  this.section = employee.section;
  this.subsection= employee.sub-section;
  this.subject = employee.subject;
  this.aoorder = employee.ao-order;
  this.itatorder = employee.itat-order;
  this.conclusion = employee.conclusion;
  this.download = employee.downloadl;
  this.upload = employee.upload

};

Employee.create = (newEmployee, result) => {
  sql.query(`insert into business  values('${date}','${subsection}','${subject}','${aoorder}','${itatorder}','${conclusion}','${download}','${upload}',);`, newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM business WHERE id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found employee with the id
    result({ kind: "not_found" }, null);
  });
};


Employee.getAll = result => {
  sql.query("SELECT * FROM business", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE business SET date =?, section =?, subsection =?,subject = ?, aoorder =? , itatorder =?,conclusion=?,download=?,upload=?, WHERE id = ?",
    [ employee.date,employee.section,employee.subsection,employee.subject,employee.aoorder,employee.itatorder,employee.conclusion,employee.download,employee.upload,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM business WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM business", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} business`);
    result(null, res);
  });
};

module.exports = Employee;