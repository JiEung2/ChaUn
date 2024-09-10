// // src/mocks/handlers.ts
// import { rest } from 'msw';

// export const handlers = [
//   // 닉네임 체크 요청 모킹
//   rest.post('/api/check-nickname', async (req, res, ctx) => {
//     const { nickname } = req.body as { nickname: string };

//     // public 폴더의 dummy.json 파일에서 데이터 로드
//     const response = await fetch('/dummy.json');
//     const data = await response.json();

//     // 더미 데이터베이스에서 닉네임 조회
//     const userExists = data.users.some((user: { nickname: string }) => user.nickname === nickname);

//     // 닉네임이 있으면 이미 존재하는 닉네임으로 응답
//     if (userExists) {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           exists: true,
//           message: 'Nickname already exists',
//         })
//       );
//     }

//     // 닉네임이 없으면 사용 가능하다는 응답
//     return res(
//       ctx.status(200),
//       ctx.json({
//         exists: false,
//         message: 'Nickname is available',
//       })
//     );
//   }),
// ];
