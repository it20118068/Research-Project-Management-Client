import { useContext, useEffect, useRef, useState } from "react";
import GroupChatService from "../services/GroupChatService";
import { io } from "socket.io-client";
import AuthenticationService from "../services/AuthenticationService";
import StudentGroupService from "../services/StudentGroupService";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageTxt, setMessageTxt] = useState();

  //User Details
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [sid, setSid] = useState("");
  const [grpId, setGroupId] = useState(localStorage.getItem("grpId"));
  const [role, setRole] = useState();

  const socket = useRef();

  useEffect(() => {
    AuthenticationService.authUser().then((res) => {
      if (res.data.role != 2) {
        window.location.href = "/Login";
      } else {
        console.log(res.data);
        setUserId(res.data.id);
        setRole(res.data.role);
        setName(res.data.name);

        getChat();
      }
    });
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data);
      getChat();
    });
  }, []);

  function getChat() {
    GroupChatService.getChat(grpId)
      .then((res) => {
        // console.log(res.data.messages);
        setMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  function sendMessage(e) {
    e.preventDefault();
    let message = { sender: name, message: messageTxt };
    const msg = { grpId: grpId, message: message };

    GroupChatService.sendMessage(msg)
      .then((res) => {
        getChat();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessageTxt("");

    socket.current.emit("sendMessage", {
      message: msg,
    });
  }

  return (
    <div>
      <div className="card bg-dark p-3" style={{ opacity: "90%" }}>
        <h4 className="mb-4 p-4 card-header title-bg ">Chat Room</h4>
        <div class="btn-group"></div>
        <div className="card-body mb-5 row">
          {role ==1 &&   
          <div
            className="col-3 overflow-auto"
            style={{ height: "52vh", backgroundColor: "white" }}
          ></div>}
          <div className="col" style={{ height: "52vh" }}>
            <div>
              <div className="overflow-auto" style={{ height: "45vh" }}>
                {messages.map((msg) => (
                  <div className="card p-1 m-1" key={Math.random()}>
                    <h6>{msg.sender}</h6>

                    {msg.message}
                  </div>
                ))}
              </div>
              <div className="form-group row m-3">
                <input
                  type="text"
                  className="form-control col m-2"
                  value={messageTxt}
                  onChange={(e) => setMessageTxt(e.target.value)}
                />
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-2"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
