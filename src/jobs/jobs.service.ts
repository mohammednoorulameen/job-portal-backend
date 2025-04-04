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

