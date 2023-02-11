import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { SchoolService } from './school.service';
import { GradesQueryDto } from './dto/gradesQuery.dto';
import { LessonsQueryDto } from './dto/lessonsQuery.dto';
import { GetUser } from '../auth/decorator/getUser.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('grades')
  async getGrades(
    @Query() query: GradesQueryDto,
    @GetUser() user: JwtAuthDto,
  ): Promise<object> {
    return { grades: await this.schoolService.getGrades(query.last, user) };
  }

  @Get('lessons')
  async getLessons(
    @Query() query: LessonsQueryDto,
    @GetUser() user: JwtAuthDto,
  ): Promise<{ lessons: object[] }> {
    return this.schoolService.getLessons(query.from, query.to, user);
  }

  @Get('lucky-number')
  async getLuckyNumber(@GetUser() user: JwtAuthDto): Promise<object> {
    return this.schoolService.getLuckyNumber(user);
  }
  @Get('student')
  async getStudent(@GetUser() user: JwtAuthDto): Promise<object> {
    return this.schoolService.getStudent(user);
  }
}