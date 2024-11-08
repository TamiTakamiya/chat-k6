import http from 'k6/http';
// import { sleep } from 'k6';
// export const options = {
//   vus: 1,
//   duration: '30s',
// };
const API_KEY = __ENV.API_KEY;

const QUERIES= [
  "What is new in AAP 2.5?",
  "How can I migrate from AAP 2.4 to 2.5?",
  "What is Platform Gateway?",
  "Write a sample inventry file.",
  "What is Ansible Lightspeed?",
];

function callChatAPI(data) {
  const res = http.post(
    'http://localhost:8000/api/v0/ai/chat/',
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
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
    query: "What is Ansible Lightspeed?",
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