
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JobEntity } from './entities/job.entity';
import { File as MulterFile } from 'multer';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Get()
  async getJobs(@Query() filters: any): Promise<JobEntity[]> {
    console.log('📥 GET /jobs called with filters:', filters); // 👈 Log filters from frontend
  
    const jobs = await this.jobsService.getJobs(filters);
    console.log('📤 Responding with jobs:', jobs); // 👈 Log result being sent
  
    return jobs;
  }
  


@Post()
@UseInterceptors(
  FileInterceptor('companyLogo', {
    storage: diskStorage({
      destination: path.join(__dirname, '..', 'public', 'uploads'),
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  }),
)
async createJob(
  @Body() job: Partial<JobEntity>,
  @UploadedFile() file: MulterFile,
): Promise<JobEntity> {
  console.log('📥 POST /jobs called with body:', job);

  // ✅ Convert date to ISO
  if (job.applicationDeadline) {
    job.applicationDeadline = new Date(job.applicationDeadline).toISOString();
  }

  if (file) {
    job.companyLogo = `uploads/${file.filename}`;
  }

  const savedJob = await this.jobsService.createJob(job);
  console.log('✅ Job saved:', savedJob);
  return savedJob;
}
}
