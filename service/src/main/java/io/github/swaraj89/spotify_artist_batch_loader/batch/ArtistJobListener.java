package io.github.swaraj89.spotify_artist_batch_loader.batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.job.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListener;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Slf4j
@Component
public class ArtistJobListener implements JobExecutionListener {

    @Override
    public void beforeJob(JobExecution jobExecution) {
        log.info("Job starting: {}", jobExecution.getJobInstance().getJobName());
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        Duration duration = Duration.between(jobExecution.getStartTime(), jobExecution.getEndTime());

        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("Job finished successfully! Total time: {} seconds", duration.getSeconds());
        } else if (jobExecution.getStatus() == BatchStatus.FAILED) {
            log.error("Job failed after {} seconds. Exceptions: {}", duration.getSeconds(), jobExecution.getAllFailureExceptions());
        }
    }
}