import {
    PrimaryGeneratedColumn,
    Column,
    BeforeUpdate,
    DeleteDateColumn,
  } from 'typeorm';
  
  export abstract class SharedEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;
  
    @Column({ nullable: true })
    createdBy?: string;
  
    @Column({ nullable: true, type: 'timestamp' })
    updatedOn?: Date;
  
    @Column({ nullable: true })
    updatedBy?: string;
  
    @Column({ nullable: true, type: 'timestamp' })
    @DeleteDateColumn({ type: 'timestamp with time zone' })
    deletedOn?: Date;
  
    @Column({ nullable: true })
    deletedBy?: string;

    @Column({ default: false })
    isDeleted?: Boolean;
    /**
     *
     */
  
    @BeforeUpdate()
    updateDates() {
      this.updatedOn = new Date();
    }
  }
  