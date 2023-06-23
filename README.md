# ACB USER

## how to run
```
cd back-end
cp ./env/dev.sample ./env/dev.env
// change env file to fix your environment
npm i
npm start
```
## command
```
# unit test
npm test

# tslint validate
npm run tslint
```
# back-end

# các yêu cầu 
+ đặt tên hàm, tên biến, ngắn gọn, rõ ràng.
+ khi cần làm 1 task, tạo issue, tạo branch để làm task đó, khi làm xong thì pull merge request.
+ tạo các biến const, let, var theo từng trường hợp.
+ các function nào sữ dụng nhiều thì viết riêng trong utility sau đó gọi để xài.
+ các funtion không để param quá nhiều biến , nếu có nhiều biến (>3 biến) thì tạo param = object.
+ khi viết 1 funtion định nghĩa input,output trước, ruột viết sau.
+ review code chéo nhau.
+ các config, thông báo, thì tạo constant riêng nếu cần (trong thư mục constant).
+ các config quan trọng thì để trong file env.
