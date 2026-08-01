package io.github.swaraj89.spotify_artist_batch_loader.batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.listener.StepExecutionListener;
import org.springframework.batch.core.step.StepExecution;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Slf4j
@Component
public class ArtistStepListener implements StepExecutionListener {

    @Override
    public void beforeStep(StepExecution stepExecution) {
        log.info("Step starting: {}", stepExecution.getStepName());
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        Duration duration = Duration.between(stepExecution.getStartTime(), stepExecution.getEndTime());

        log.info("Step finished: {}", stepExecution.getStepName());
        log.info("Read count: {}", stepExecution.getReadCount());
        log.info("Write count: {}", stepExecution.getWriteCount());
        log.info("Skip count: {}", stepExecution.getSkipCount());
        log.info("Time taken: {} seconds", duration.getSeconds());

        return stepExecution.getExitStatus();
    }
}