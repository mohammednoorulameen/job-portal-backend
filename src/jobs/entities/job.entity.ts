/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column('int')
  minSalary: number;

  @Column('int')
  maxSalary: number;

  @Column('text')
  jobDescription: string;

  @Column('text')
  requirements: string;

  @Column('text')
  responsibilities: string;

  @Column('date')
  applicationDeadline: string;

  @Column()
  workLocation: string;

  @Column()
  experience: string;

  @Column({ nullable: true }) 
  companyLogo: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;
}
