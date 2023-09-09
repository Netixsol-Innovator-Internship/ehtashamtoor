import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Req,
  UploadedFile,
  Put,
  Query,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Blog } from 'src/schemas/blog.schema';
import { CreateBlogDto } from 'src/dto/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';
import { AdminGuard } from 'src/middlewares/jwt.admin.guard';
import { WriterAdminGuard } from 'src/middlewares/jwt.writerAdmin.guard';
import { WriterGuard } from 'src/middlewares/jwt.writer.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from './event.service';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { Eventt } from 'src/schemas/event.schema';
import { UpdateEventDto } from 'src/dto/update-event.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async GetAllEvnets(
    @Query('category') category: string,
    @Query('search') search: string,
  ): Promise<Eventt[]> {
    if (category) {
      // Fetch events by category
      return this.eventService.getEventsByCategory(category);
    } else if (search) {
      // Fetch events by search query
      return this.eventService.searchEvents(search);
    } else {
      // Fetch all events
      return this.eventService.getAll();
    }
  }

  // @Get('admin')
  // async GetAllBlogsAdmin(
  //   @Query('category') category: string,
  //   @Query('status') status: string,
  // ): Promise<Blog[]> {
  //   if (category || status) {
  //     console.log(category);
  //     return this.eventService.getBlogsByFiltersAdmin(category, status);
  //   } else {
  //     // Fetch all blogs
  //     return this.eventService.getAllBlogsAdmin();
  //   }
  // }

  @Get('user/:id')
  async GetAllEventsUser(
    @Param() id: string,
  ): Promise<{ events?: Eventt[]; success?: boolean; message?: string }> {
    console.log('into get all Events of user');
    return this.eventService.getAllEventsUser(id);
  }

  @Get(':id')
  async GetEvent(@Param('id') id: string): Promise<{ eventFound: Eventt }> {
    try {
      return this.eventService.getSingleEvent(id);
    } catch (error) {
      console.log(error.message);
    }
  }
  @Post('new')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('thumbnail'))
  async CreateEvent(
    @Req() req,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() event: CreateEventDto,
  ): Promise<{ newEvent?: Eventt; success?: boolean; message?: string }> {
    // getting filePath for the uploaded file
    if (thumbnail) {
      // console.log(thumbnail);
      // upload Image to the cloudinary here and get id, path
      const image = await this.cloudinaryService.uploadImage(
        thumbnail,
        'BookingApp/eventImages',
        'eventImages',
      );
      if (!image) {
        return { success: false, message: 'Error uploading Image' };
      }
      event.thumbnail = {
        path: image.secure_url,
        imageId: image.public_id,
      };
      // console.log(image);
      return this.eventService.createEvent(event, req.user);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async RemoveBlog(@Param('id') id: string): Promise<string> {
    return await this.eventService.deleteEvent(id);
  }
  @Put(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('thumbnail'))
  async UpadateBlog(
    @Param('id') id: string,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() event: UpdateEventDto,
  ): Promise<{ success?: boolean; message?: string }> {
    try {
      // Get the existing event from MongoDB
      const eventFoundWrapper = await this.eventService.getSingleEvent(id);
      const eventFound = eventFoundWrapper.eventFound;

      if (thumbnail) {
        // Store existing thumbnail details for deletion
        const oldThumbnail = eventFound.thumbnail;

        // Upload the new image to Cloudinary
        const image = await this.cloudinaryService.uploadImage(
          thumbnail,
          'BookingApp/eventImages',
          'eventImages',
        );

        // Update the event object with the new image details
        event.thumbnail = {
          path: image.secure_url,
          imageId: image.public_id,
        };

        // Update the event in MongoDB
        const updatedEvent = await this.eventService.updateEvent(id, event);

        // Delete the old image from Cloudinary if the MongoDB update was successful
        if (updatedEvent.success && oldThumbnail) {
          await this.cloudinaryService.deleteImage(oldThumbnail.imageId);
        }

        return updatedEvent;
      } else {
        // If thumbnail is not provided (using existing image details)
        event.thumbnail = JSON.parse(`${event.thumbnail}`);
        return this.eventService.updateEvent(id, event);
      }
    } catch (error) {
      console.error('Error updating event:', error.message);
      return {
        success: false,
        message: 'Error updating event',
      };
    }
  }
}
