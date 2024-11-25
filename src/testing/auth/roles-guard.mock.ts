import { CanActivate, ExecutionContext } from "@nestjs/common";

export const rolesGuardMock: CanActivate = {
    canActivate: jest.fn((context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        return user && user.role === 'admin';
      }),
}