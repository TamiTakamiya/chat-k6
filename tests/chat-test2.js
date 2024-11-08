import http from 'k6/http';

const QUERIES= [
  "What is new in AAP 2.5?",
  "How can I migrate from AAP 2.4 to 2.5?",
  "What is Platform Gateway?",
  "Write a sample inventry file.",
  "What is Ansible Lightspeed?",
];

function callChatAPI(data) {
  const res = http.post(
    'http://localhost:8080/v1/query',
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  console.log(res.status_text);
  const body = JSON.parse(res.body);
  console.log(body.response);
  return res;
}

export default function () {
  const data = {
    provider: "my_rhoai",
    model: "granite-8b",
    query: "Hello"
  };
  let res = callChatAPI(data);
  if (res.status === 200) {
    const body = JSON.parse(res.body);
    data.conversation_id = body.conversation_id;
    for (const query of QUERIES) {
      data.query = query;
      console.log(`QUERY: ${query}`);
      res = callChatAPI(data);
    }
  }
  // sleep(1);
}