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


// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   UseInterceptors,
//   UploadedFile,
//   Query,
// } from '@nestjs/common';
// import { JobsService } from './jobs.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import * as path from 'path';
// import { JobEntity } from './entities/job.entity';
// import { Multer } from 'multer'; 

// @Controller('jobs')
// export class JobsController {
//   constructor(private readonly jobsService: JobsService) {}

//   /**
//    * fetch the filtered jobs
//    */

//   @Get()
//   async getJobs(@Query() filters: any): Promise<JobEntity[]> {
//     console.log(filters)
//     return this.jobsService.getJobs(filters);
//   }

//   /**
//    * Create a job and upload company logo
//    */

//   @Post()
//   @UseInterceptors(
//     FileInterceptor('companyLogo', {
//       storage: diskStorage({
//         destination: './public/uploads',
//         filename: (req, file, callback) => {
//           const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
//           callback(null, uniqueSuffix);
//         },
//       }),
//     }),
//   )
//   async createJob(
//     @Body() job: Partial<JobEntity>,
//     @UploadedFile() file: Multer.File,
//   ): Promise<JobEntity> {
//     // ✅ Fix Multer type
//     if (file) {
//       job.companyLogo = `/uploads/${file.filename}`;
//     }
//     console.log(job);
//     return this.jobsService.createJob(job);
//   }
// }

// import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { JobsService } from './jobs.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import * as path from 'path';
// import { Multer } from 'multer';
// import { JobEntity } from './entities/job.entity';

// @Controller('jobs')
// export class JobsController {
//   constructor(private readonly jobsService: JobsService) {}

// /**
//  * Create a job and upload company logo
//  */
//   @Post()
//   @UseInterceptors(
//     FileInterceptor("companyLogo", {
//       storage: diskStorage({
//         destination: './public/uploads',
//         filename: (req, file, callback) => {
//           const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
//           callback(null, uniqueSuffix);
//         },
//       }),
//     })
//   )
//   async createJob(@Body() job: Partial<JobEntity>, @UploadedFile() file: Express.Multer.File): Promise<JobEntity> {
//     if (file) {
//       job.companyLogo = `/uploads/${file.filename}`; // ✅ Store the relative path
//     }
//     console.log(job);
//     return this.jobsService.createJob(job);
//   }
// }

// import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { JobsService } from './jobs.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { JobEntity } from './entities/job.entity';

// @Controller('jobs')
// export class JobsController {
//   constructor(private readonly jobsService: JobsService) {}

//   /**
//    * create a job and logo uploading
//    */

//   @Post()
//   @UseInterceptors(
//     FileInterceptor:("CompanyLogo", {
//       storage: diskStorage({
//        destnation: './public/uploads',
//        filename :(req, file, callback)=>{
//         const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`,
//         callback(null, uniqueSuffix);
//        }

//       })
//     })
//   )

//   async createJob(@Body() job: Partial<JobEntity>, @UploadedFile() file: Express.Multer.File): Promise<Job> {
//     if (file) {
//         job.companyLogo = `/uploads/${file.filename}`; // Store the relative path in the database
//       }
//     console.log(job)
//     return this.jobsService.createJob(job);
//   }
// }

// // import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// // import { JobsService } from './jobs.service';
// // import { CreateJobDto } from './dto/create-job.dto';
// // import { UpdateJobDto } from './dto/update-job.dto';

// // @Controller('jobs')
// // export class JobsController {
// //   constructor(private readonly jobsService: JobsService) {}

// //   @Post()
// //   create(@Body() createJobDto: CreateJobDto) {
// //     return this.jobsService.create(createJobDto);
// //   }

// //   @Get()
// //   findAll() {
// //     return this.jobsService.findAll();
// //   }

// //   @Get(':id')
// //   findOne(@Param('id') id: string) {
// //     return this.jobsService.findOne(+id);
// //   }

// //   @Patch(':id')
// //   update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
// //     return this.jobsService.update(+id, updateJobDto);
// //   }

// //   @Delete(':id')
// //   remove(@Param('id') id: string) {
// //     return this.jobsService.remove(+id);
// //   }
// // }
