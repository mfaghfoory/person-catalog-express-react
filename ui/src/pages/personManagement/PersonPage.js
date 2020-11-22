import React, { useEffect, useState } from "react";
import PersonAddUpdate from "./PersonAddUpdate";
import "./PersonPage.css";

export default function PersonPage(prop) {
  const [editMode, setEditMode] = useState(false);
  const [model, setModel] = useState({});
  const [data, setData] = useState([]);
  const authHeaders = { authorization: `basic ${btoa("test:test")}` };
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    fetch("http://localhost:9000/people", {
      headers: { ...authHeaders },
    })
      .then(async (o) => {
        if (!o.ok) {
          throw new Error(o.statusText);
        }
        const responseData = await o.json();
        setData(responseData);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function removeItem(id) {
    if (!window.confirm("Are you sure?")) return;
    fetch("http://localhost:9000/people/" + id, {
      headers: { ...authHeaders },
      method: "delete",
    })
      .then(async (o) => {
        if (!o.ok) {
          throw new Error(o.statusText);
        }
        loadData();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function editItem(id) {
    fetch("http://localhost:9000/people/" + id, {
      headers: { ...authHeaders },
    })
      .then(async (o) => {
        if (!o.ok) {
          throw new Error(o.statusText);
        }
        setEditMode(true);
        const responseData = await o.json();
        setModel(responseData);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function saveItem() {
    fetch("http://localhost:9000/people/" + (model.id || ""), {
      headers: { ...authHeaders, "Content-Type": "application/json" },

      method: model.id ? "put" : "post",
      body: JSON.stringify(model),
    })
      .then(async (o) => {
        if (!o.ok) {
          const errors = await o.json();
          throw new Error(JSON.stringify(errors, null, 2));
        }
        setEditMode(false);
        loadData();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onChangeModel(propName, value) {
    model[propName] = value;
    setModel({ ...model });
  }

  return (
    <>
      <br />
      <div className="row">
        <button
          className="button btn-blue"
          onClick={() => {
            setEditMode(true);
            setModel({});
          }}
        >
          New
        </button>
      </div>
      <div className="row">
        <table className="dataTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.bio}</td>
                <td>
                  <button
                    className="button btn-green"
                    onClick={editItem.bind(this, d.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="button btn-red"
                    onClick={removeItem.bind(this, d.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editMode && (
        <div className="row">
          <PersonAddUpdate
            model={model}
            onChangeModel={onChangeModel}
          ></PersonAddUpdate>
          <button className="button btn-blue" onClick={saveItem.bind(this)}>
            Save
          </button>
        </div>
      )}
    </>
  );
}
