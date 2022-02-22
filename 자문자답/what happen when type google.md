# what happen when type google

## Client에서 구글 검색시
1. DNS 조회
2. HTTP 요청 메시지 생성
3. 애플리케이션 계층에서 SOCKET 라이브러리를 통해서 가상 연결(3 way handshake)
4. os에서 HTTP 요펑 메시지를 담은 TCP/IP 패킷 생성후 
5. 네트워크 인터페이스 계층에서 LAN 장비로 인터넷을 통해서 서버로 패킷 전송
6. Server -> Client 응답 패킷 전송 
7. Client에서 HTML 렌더링 
