import {
  Query,
  Controller,
  Body,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateLabReqDto,
  GetLabListReqDto,
  GetLabListResDto,
  OkResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { LabService } from './lab.service';
import { UpdateLabReqDto } from 'src/dto/lab/update-lab-req.dto';

@Controller('lab')
export class LabController {
  constructor(private labService: LabService) {}

  @Get()
  @ApiQuery({ type: GetLabListReqDto })
  @ApiOkResponse({ type: [GetLabListResDto] })
  @ApiOperation({ summary: '연구실 목록 가져오기' })
  async getLabList(
    @Query() query: GetLabListReqDto,
  ): Promise<GetLabListResDto[]> {
    return this.labService.getLabList(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  async createLab(
    @GetUser() user: User,
    @Body() lab: CreateLabReqDto,
  ): Promise<OkResDto> {
    return this.labService.createLab(lab, user.id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  async updateLab(
    @GetUser() user: User,
    @Body() lab: UpdateLabReqDto,
  ): Promise<OkResDto> {
    return this.labService.updateLab(lab, user.id);
  }
}
