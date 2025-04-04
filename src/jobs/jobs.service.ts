import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  /**
   * Saving the job in the database
   */
  async createJob(jobData: Partial<JobEntity>): Promise<JobEntity> {
    return this.jobRepository.save(jobData);
  }

  /**
   * Get jobs from the database with filters
   */
  async getJobs(filters: any): Promise<JobEntity[]> {
    const query = this.jobRepository.createQueryBuilder('job');

    if (filters.search) {
      query.andWhere('job.jobTitle ILIKE :jobTitle', { jobTitle: `%${filters.search}%` });
    }

    if (filters.location) {
      query.andWhere('job.location ILIKE :location', { location: `%${filters.location}%` });
    }

    if (filters.jobType) {
      query.andWhere('job.jobType = :jobType', { jobType: filters.jobType });
    }

    if (filters.salaryRange) {
      let [min, max] = filters.salaryRange.includes('-')
        ? filters.salaryRange.split('-').map(Number)
        : filters.salaryRange.split(',').map(Number);

      if (!isNaN(min) && !isNaN(max)) {
        query.andWhere('job.salaryMin >= :min AND job.salaryMax <= :max', {
          min,
          max,
        });
      }
    }

    return query.getMany();
  }
}



// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { JobEntity } from './entities/job.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class JobsService {
//   constructor(
//     @InjectRepository(JobEntity)
//     private readonly jobRepository: Repository<JobEntity>,
//   ){}

//   /**
//    * saving the job database
//    */

//   async createJob(JobEntity: Partial<JobEntity>): Promise <JobEntity>{
//     return this.jobRepository.save(JobEntity)
//   }

// /**
//    * get job from database
//    */

// async getJobs(filters: any): Promise<JobEntity[]> {
//   const query = this.jobRepository.createQueryBuilder('job');

//   if (filters.search) {
//     query.andWhere('job.jobTitle ILIKE :jobTitle', { jobTitle: `%${filters.search}%` });
//   }

//   if (filters.location) {
//     query.andWhere('job.location LIKE :location', { location: `%${filters.location}%` });
//   }
//   if (filters.jobType) {
//     query.andWhere('job.jobType = :jobType', { jobType: filters.jobType });
//   }
//   if (filters.salaryRange) {
//       // Replace the  comma and  hyphen  then split
//       const [min, max] = filters.salaryRange.replace(',', '-').split('-').map(Number);
    
//       if (!isNaN(min) && !isNaN(max)) {
//         // Convert to LPA and round to  nearest integer
//         const minLPA = Math.floor(min / 100);
//         const maxLPA = Math.floor(max / 100);
    
//         query.andWhere('job.salaryMin >= :minLPA AND job.salaryMax <= :maxLPA', {
//           minLPA,
//           maxLPA,
//         });
//       }
//     }
//     return query.getMany();
// }

// }


// import { Injectable } from '@nestjs/common';
// import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';

// @Injectable()
// export class JobsService {
//   create(createJobDto: CreateJobDto) {
//     return 'This action adds a new job';
//   }

//   findAll() {
//     return `This action returns all jobs`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} job`;
//   }

//   update(id: number, updateJobDto: UpdateJobDto) {
//     return `This action updates a #${id} job`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} job`;
//   }
// }
