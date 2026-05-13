import { Router } from "express";
import { UserRolController } from "../../infrastructure/controllers/User_rol.controller";
import { CreateUserRolUseCase } from "../../domain/use-case/CreateUserRolUseCase";
import { GetAllUserRolUseCase } from "../../domain/use-case/GetAllUserRolUseCase";
import { pgUserRolRepository } from "../../infrastructure/repositories/PgUserRolRepository";

