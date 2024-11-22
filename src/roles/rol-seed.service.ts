/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRoles() {
    const roles = ['admin', 'instructor','coordinador']; // Lista de roles a crear

    for (const roleName of roles) {
      // Verificar si el rol ya existe
      const roleExists = await this.roleRepository.findOneBy({
        rol_name: roleName,
      });

      // Si el rol no existe, lo creamos
      if (!roleExists) {
        const role = this.roleRepository.create({ rol_name: roleName });
        await this.roleRepository.save(role);
        console.log(`Role ${roleName} created.`);
      }
    }
  }
}

