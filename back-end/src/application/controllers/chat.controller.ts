import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from 'src/domain/services/chat.service';
import { CreatePersonalChatDTO } from '../dtos/create-personal-chat-dto';
import { CreateGroupChatDTO } from '../dtos/create-group-chat-dto';
import { Helper } from 'src/common/helper';
import { IResponse } from '../interfaces/response-interface';
import { PersonalChat } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('personal-chat')
  async createPersonalChat(
    @Body() createPersonalChatDTO: CreatePersonalChatDTO,
  ): Promise<IResponse<boolean>> {
    const validationResult = this.validateCreatePersonalChatDTO(
      createPersonalChatDTO,
    );

    if (validationResult != '')
      return Helper.createResponse(false, validationResult, false);

    return await this.chatService.createPersonalChat(createPersonalChatDTO);
  }

  @Post('group-chat')
  async createGroupChat(@Body() createGroupChatDTO: CreateGroupChatDTO) {
    const validationResult =
      this.validateCreateGroupChatDTO(createGroupChatDTO);

    if (validationResult != '')
      return Helper.createResponse(false, validationResult, false);

    return await this.chatService.createGroupChat(createGroupChatDTO);
  }

  @Get('personal-chat/:senderId/:receiverId')
  async getPersonalChatBySenderAndReceiver(
    @Param() params: any,
  ): Promise<IResponse<PersonalChat[]>> {
    const senderId = params.senderId;
    const receiverId = params.receiverId;

    if (senderId == undefined || receiverId == undefined)
      return Helper.createResponse(
        [],
        'There is no sender or receiver id',
        false,
      );

    return await this.chatService.getPersonalChatBySenderAndReceiver(
      senderId,
      receiverId,
    );
  }

  @Get('group-chat/:groupId')
  async getGroupChatByGroupId(@Param() params: any) {
    const groupId = params.groupId;
    if (groupId == undefined)
      return Helper.createResponse([], 'There is no group id', false);

    return await this.chatService.getGroupChatByGroupId(groupId);
  }

  validateCreatePersonalChatDTO(dto: CreatePersonalChatDTO): string {
    const errors: string[] = [];

    // Validate senderId
    if (!dto.senderId || typeof dto.senderId !== 'string') {
      errors.push('SenderId must be a non-empty string.');
    }

    // Validate receiverId
    if (!dto.receiverId || typeof dto.receiverId !== 'string') {
      errors.push('ReceiverId must be a non-empty string.');
    }

    if (dto.senderId == dto.receiverId)
      errors.push('Cannot send message to the same user');

    // Validate message
    if (
      !dto.message ||
      typeof dto.message !== 'string' ||
      dto.message.length === 0
    ) {
      errors.push('Message must be a non-empty string.');
    }

    return errors.length > 0 ? errors[0] : '';
  }

  validateCreateGroupChatDTO(dto: CreateGroupChatDTO): string {
    const errors: string[] = [];

    // Validate groupId
    if (!dto.groupId || typeof dto.groupId !== 'string') {
      errors.push('GroupId must be a non-empty string.');
    }

    // Validate senderId
    if (!dto.senderId || typeof dto.senderId !== 'string') {
      errors.push('SenderId must be a non-empty string.');
    }

    // Validate message
    if (
      !dto.message ||
      typeof dto.message !== 'string' ||
      dto.message.length === 0
    ) {
      errors.push('Message must be a non-empty string.');
    }

    return errors.length > 0 ? errors[0] : '';
  }
}
