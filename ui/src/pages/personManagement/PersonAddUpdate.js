function PersonAddUpdate(props) {
  return (
    <div>
      <input
        style={input}
        value={props.model.name}
        onChange={(e) => props.onChangeModel("name", e.currentTarget.value)}
      ></input>
      <br />
      <input
        style={input}
        value={props.model.email}
        onChange={(e) => props.onChangeModel("email", e.currentTarget.value)}
      ></input>
      <br />
      <textarea
        style={textarea}
        value={props.model.bio}
        onChange={(e) => props.onChangeModel("bio", e.currentTarget.value)}
      ></textarea>
    </div>
  );
}

export default PersonAddUpdate;

const textarea = {
  height: "100px",
  padding: "12px 20px",
  "box-sizing": "border-box",
  border: "2px solid #ccc",
  "border-radius": "4px",
  "background-color": "#f8f8f8",
  resize: "none",
};

const input = {
  height: "30px",
  border: "2px solid #ccc",
  "border-radius": "4px",
};
