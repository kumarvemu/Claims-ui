import { Fragment } from "react";

const NoteRow = (props) => {
  return (
    <Fragment>
      <tr>
        <td>{props.note.date}</td>
        <td>{props.note.detail}</td>
      </tr>
    </Fragment>
  );
}

export default NoteRow;