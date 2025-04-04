import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobEntity } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
  ) {}

  async createJob(jobData: Partial<JobEntity>): Promise<JobEntity> {
    return this.jobRepo.save(jobData);
  }

  async getJobs(filters: any): Promise<JobEntity[]> {
    const query = this.jobRepo.createQueryBuilder('job');

    console.log('Filters received in backend:', filters); 

    if (filters.search) {
      query.andWhere('job.jobTitle ILIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    if (filters.location) {
      query.andWhere('job.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.jobType) {
      query.andWhere('job.jobType = :jobType', { jobType: filters.jobType });
    }

    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(Number);
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

