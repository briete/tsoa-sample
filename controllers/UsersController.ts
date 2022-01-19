import { User } from "../entities/User";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { getRepository } from "typeorm";

type CreateUserParams = {
  name: string;
};

type UpdateUserParams = CreateUserParams;

type UserResponse = {
  id: number;
  name: string;
};

@Route("users")
@Tags("user")
export class UsersController extends Controller {
  /**
   * ユーザーを作成する
   * @param requestBody リクエストボディ
   */
  @SuccessResponse(201, "Created")
  @Post()
  async createUser(@Body() requestBody: CreateUserParams): Promise<void> {
    const repo = getRepository(User);
    const user = repo.create(requestBody);
    repo.save(user);
  }

  /**
   * ユーザーを取得する
   * @param userId ユーザーID
   * @returns ユーザー情報
   */
  @Get("{userId}")
  async getUser(@Path() userId: number): Promise<UserResponse> {
    const repo = getRepository(User);
    const user = await repo.findOne(userId);

    if (!user) {
      throw new Error("ユーザーが見つかりませんでした。");
    }
    return {
      id: user.id,
      name: user.name,
    };
  }

  /**
   * ユーザーを更新する
   * @param userId ユーザーID
   * @param requestBody リクエストボディ
   */
  @Patch("{userId}")
  async updateUser(
    @Path() userId: number,
    @Body() requestBody: UpdateUserParams
  ): Promise<UserResponse> {
    const repo = getRepository(User);
    const user = await repo.findOne(userId);

    if (!user) {
      throw new Error("ユーザーが見つかりませんでした。");
    }

    user.name = requestBody.name;
    const updateUser = await repo.save(user);
    return {
      id: updateUser.id,
      name: updateUser.name,
    };
  }

  @Delete("{userId}")
  async deleteUser(@Path() userId: number): Promise<void> {
    const repo = getRepository(User);
    const user = await repo.findOne(userId);

    if (!user) {
      throw new Error("ユーザーが見つかりませんでした。");
    }

    repo.delete(user);
  }
}
