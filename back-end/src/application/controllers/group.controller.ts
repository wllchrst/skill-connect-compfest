import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGroupDTO } from '../dtos/create-group.dto';
import { Helper } from 'src/common/helper';
import { GroupService } from 'src/domain/services/group.service';
import { CreateGroupMemberDTO } from '../dtos/create-group-member.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Get()
  async getAllGroup() {
    return this.groupService.getAllGroup();
  }

  @Post()
  async createGroup(@Body() createGroupDTO: CreateGroupDTO) {
    const validationMessage = this.validateGroupCreation(createGroupDTO);
    if (validationMessage != '')
      return Helper.createResponse(false, validationMessage, false);

    return this.groupService.createGroup(createGroupDTO);
  }

  @Post('member')
  async addGroupMember(@Body() createGroupMemberDTO: CreateGroupMemberDTO) {
    return this.groupService.addGroupMember(createGroupMemberDTO);
  }

  validateGroupCreation(createGroupDTO: CreateGroupDTO): string {
    if (
      createGroupDTO.description == undefined ||
      createGroupDTO.groupName == undefined ||
      createGroupDTO.description == null ||
      createGroupDTO.groupName == null
    )
      return 'Every field is required';
    else if (createGroupDTO.description == '')
      return 'Description cannot be empty';
    else if (createGroupDTO.groupName == '')
      return 'Group name cannot be empty';

    return '';
  }
}
