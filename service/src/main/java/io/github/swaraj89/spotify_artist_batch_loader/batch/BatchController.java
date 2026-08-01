package io.github.swaraj89.spotify_artist_batch_loader.batch;

import lombok.AllArgsConstructor;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.parameters.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/batch")
@AllArgsConstructor
public class BatchController {
    private final JobLauncher jobLauncher;
    private final Job artistJob;

    @PostMapping("/start")
    public String startBatchJob() {
        try {
            var jobParameters = new JobParametersBuilder()
                    .addLong("startAt", System.currentTimeMillis())
                    .toJobParameters();
            jobLauncher.run(artistJob, jobParameters);
            return "Batch job started successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to start batch job: " + e.getMessage();
        }
    }
}
