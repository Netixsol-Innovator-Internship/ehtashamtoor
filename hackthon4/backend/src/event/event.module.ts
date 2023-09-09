import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AdminGuard } from 'src/middlewares/jwt.admin.guard';
import { WriterAdminGuard } from 'src/middlewares/jwt.writerAdmin.guard';
import { WriterGuard } from 'src/middlewares/jwt.writer.guard';
import { EventtSchema } from 'src/schemas/event.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Eventt', schema: EventtSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService, CloudinaryService],
})
export class EventModule {}
