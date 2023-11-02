import React from "react";

const ActionEvent = (props) => {
  const handleSelected = () => {
    props.handleActionEventCallback(props.index);
  };

  return (
    <div className="action-table-item" onClick={handleSelected}>
      {props.index +
        " ---- " +
        props.action_type +
        " -- " +
        props.time +
        " -- " +
        props.action_result +
        " -- P#" +
        props.player}
    </div>
  );
};

export default ActionEvent;
