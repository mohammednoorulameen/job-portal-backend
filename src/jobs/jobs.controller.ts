import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { JobEntity } from './entities/job.entity';
import { File as MulterFile } from 'multer'; // ✅ Use correct type

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getJobs(@Query() filters: any): Promise<JobEntity[]> {
    console.log(filters);
    return this.jobsService.getJobs(filters);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('companyLogo', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', 'public', 'uploads'),
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async createJob(
    @Body() job: Partial<JobEntity>,
    @UploadedFile() file: MulterFile, // ✅ Corrected type
  ): Promise<JobEntity> {
    if (file) {
      (job as any).companyLogo = `/uploads/${file.filename}`;
    }
    console.log(job);
    return this.jobsService.createJob(job);
  }
}

