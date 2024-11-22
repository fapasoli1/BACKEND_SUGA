import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesGuard } from './role-guard/role-guard.guard';  


@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesGuard],
  exports: [RolesService],
})
export class RolesModule {}
