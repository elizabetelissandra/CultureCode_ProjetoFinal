import { ApiProperty } from "@nestjs/swagger";

export class TokenDoc{
    @ApiProperty({description: 'token login', type: String, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6ImRpZWdvb3N2YWxkb3JlemVuZGVAY2xhZG0uY29tLmJyIiwidXNlclJvbGUiOiJhZG1pbiIsImlzcyI6IkN1bHR1cmUgQ29kZSBVc2VyIiwiYXVkIjoidXNlcnMgZnJvbSBDdWx0dXJlIENvZGUiLCJpYXQiOjE3MzE2NzQwNzAsImV4cCI6MTczMTY3NDM3MH0.2AXK52mzJPT-T-FM_p-bGjS3bnpfX5OzIrtuydfs2i0", title: 'Token'})
    token: String
}