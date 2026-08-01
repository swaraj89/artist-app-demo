package io.github.swaraj89.spotify_artist_batch_loader.batch;

import io.github.swaraj89.spotify_artist_batch_loader.artist.Artist;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.Step;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.infrastructure.item.file.FlatFileItemReader;
import org.springframework.batch.infrastructure.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class BatchConfig {
    public static final String BATCH_JOB_NAME = "artistBatchJob";
    public static final String BATCH_STEP_NAME = "artistBatchStep";
    public static final String BATCH_JOB_EXECUTION_LISTENER_BEAN_NAME = "batchJobExecutionListener";
    public static final String BATCH_STEP_EXECUTION_LISTENER_BEAN_NAME = "batchStepExecutionListener";


    @Bean
    public FlatFileItemReader<ArtistCsvRow> reader(@Value("classpath:data.csv") Resource resource) {
        return new FlatFileItemReaderBuilder<ArtistCsvRow>()
                .name("artistCsvReader")
                .resource(resource)
                .linesToSkip(1)
                .delimited()
                .names("artistName", "sex", "countryOfOrigin", "primaryLanguage", "primaryGenre", "artistType", "debutYear", "totalStreams", "leadStreams", "featureStreams", "soloStreams", "percentOfSoloStreams", "collaborativeStreams", "percentOfCollaborativeStreams")
                .targetType(ArtistCsvRow.class)
                .build();
    }

    @Bean
    public Step step(JobRepository jobRepository,
                     PlatformTransactionManager transactionManager,
                     ArtistItemWriter writer,
                     FlatFileItemReader<ArtistCsvRow> reader,
                     ArtistItemProcessor processor,
                     ArtistStepListener stepListener) {
        return new StepBuilder(BATCH_STEP_NAME, jobRepository)
                .<ArtistCsvRow, Artist>chunk(10)
                .transactionManager(transactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .listener(stepListener)
                .build();
    }

    @Bean
    public Job artistJob(JobRepository jobRepository,
                         Step step,
                         ArtistJobListener listener) {
        return new JobBuilder(BATCH_JOB_NAME, jobRepository)
                .start(step)
                .listener(listener)
                .build();
    }
}
