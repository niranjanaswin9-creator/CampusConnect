package com.example.campusconnect;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static final String CHANNEL_ID = "attendance_alerts";
    private static final int NOTIFICATION_REQUEST_CODE = 101;
    private static final double REQUIRED_PERCENT = 75.0;

    private EditText etTotal;
    private EditText etAttended;
    private TextView tvResult;
    private TextView tvAdvice;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etTotal = findViewById(R.id.etTotal);
        etAttended = findViewById(R.id.etAttended);
        tvResult = findViewById(R.id.tvResult);
        tvAdvice = findViewById(R.id.tvAdvice);
        progressBar = findViewById(R.id.progressBar);
        Button btnCalculate = findViewById(R.id.btnCalculate);
        Button btnReset = findViewById(R.id.btnReset);

        createNotificationChannel();
        askNotificationPermission();

        btnCalculate.setOnClickListener(v -> calculate());
        btnReset.setOnClickListener(v -> reset());
    }

    private void calculate() {
        String totalText = etTotal.getText().toString().trim();
        String attendedText = etAttended.getText().toString().trim();

        if (totalText.isEmpty() || attendedText.isEmpty()) {
            Toast.makeText(this, "Please fill both boxes", Toast.LENGTH_SHORT).show();
            return;
        }

        int total = Integer.parseInt(totalText);
        int attended = Integer.parseInt(attendedText);

        if (total == 0) {
            Toast.makeText(this, "Total classes cannot be zero", Toast.LENGTH_SHORT).show();
            return;
        }
        if (attended > total) {
            Toast.makeText(this, "Attended classes cannot be more than total classes", Toast.LENGTH_LONG).show();
            return;
        }

        double percent = attended * 100.0 / total;
        tvResult.setText(String.format(Locale.getDefault(), "%.1f%%", percent));
        progressBar.setProgress((int) Math.round(percent));

        if (percent < REQUIRED_PERCENT) {
            int needed = 3 * total - 4 * attended;
            tvResult.setTextColor(Color.parseColor("#C62828"));
            tvAdvice.setText("Below 75%. Attend the next " + needed + " classes in a row to reach 75%.");
            showLowAttendanceNotification(percent);
        } else {
            int canMiss = (4 * attended - 3 * total) / 3;
            tvResult.setTextColor(Color.parseColor("#2E7D32"));
            tvAdvice.setText("Great! You can still miss " + canMiss + " more classes and stay at 75% or above.");
        }
    }

    private void reset() {
        etTotal.setText("");
        etAttended.setText("");
        tvResult.setText("--");
        tvAdvice.setText("");
        progressBar.setProgress(0);
    }

    // Android 8.0+ needs a "channel" before any notification can be shown.
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID, "Attendance alerts", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("Warns you when attendance falls below 75%");
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    // Android 13+ makes the user allow notifications.
    private void askNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                && ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                    this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIFICATION_REQUEST_CODE);
        }
    }

    @SuppressLint("MissingPermission")
    private void showLowAttendanceNotification(double percent) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                && ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, "Allow notifications to get attendance alerts", Toast.LENGTH_LONG).show();
            return;
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setContentTitle("Low attendance warning")
                .setContentText(String.format(Locale.getDefault(),
                        "Your attendance is %.1f%%, below the required 75%%.", percent))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true);

        NotificationManagerCompat.from(this).notify(1, builder.build());
    }
}
