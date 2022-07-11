import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", ws => {
  ws.on("message", (_data) => {
    const data = JSON.parse(_data.toString());

    if(data.type === "update_messages"){
      return ws.send(JSON.stringify(
        {
          type: data.type,
          data: [{
            id: "1",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "2",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "3",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "4",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "5",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "6",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "7",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "8",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "9",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "10",
            name: "user",
            message: "teste",
            timestamp: 0
          },
          {
            id: "11",
            name: "user",
            message: "teste",
            timestamp: 0
          }]
        }
      ))
    }
    ws.send({});
  });
  
  ws.send(JSON.stringify({type: "connected"}));
});