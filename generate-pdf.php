<?php

require('fpdf/fpdf.php');

function generateQanvastStyleReport($userData, $budgetRange, $additionalWorks = []) {
    $pdf = new FPDF();
    $pdf->AddPage();

    // Header
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Your Renovation Budget Report', 0, 1, 'C');

    // Contact Info Section
    $pdf->SetFont('Arial', '', 12);
    $pdf->Ln(10);
    $pdf->Cell(0, 10, "Name: " . $userData['name'], 0, 1);
    $pdf->Cell(0, 10, "Email: " . $userData['email'], 0, 1);
    $pdf->Cell(0, 10, "Contact Number: " . $userData['contact'], 0, 1);

    // Budget Range
    $pdf->Ln(10);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 10, 'Estimated Renovation Budget:', 0, 1);
    
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(0, 10, "$" . number_format($budgetRange['min']) . " - $" . number_format($budgetRange['max']), 0, 1);

    // Additional Works Section
    if (!empty($additionalWorks)) {
        $pdf->Ln(10);
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(0, 10, 'Additional Works Selected:', 0, 1);
        
        $pdf->SetFont('Arial', '', 12);
        foreach ($additionalWorks as $work => $details) {
            $pdf->MultiCell(0, 8, ucfirst($work) . ": " . $details['level'] . " (" . $details['description'] . ")");
        }
    }

    // Footer Note
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'I', 10);
    $pdf->MultiCell(0, 10, 'This budget is an estimate based on your selections. For a more accurate quotation, consider engaging with our recommended Interior Designers.');

    // Output
    $fileName = 'Renovation_Report_' . date('YmdHis') . '.pdf';
    $pdf->Output('D', $fileName); // D = download
}

$userData = [
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'contact' => '+65 8123 4567'
];

$budgetRange = [
    'min' => 34700,
    'max' => 41640
];

$additionalWorks = [
    'electrical works' => [
        'level' => 'Moderate',
        'description' => '$200-$1,700 (Intermediate electrical outlets for most areas of the house)'
    ],
    'painting' => [
        'level' => 'Light',
        'description' => '$100-$200 (Wall and ceiling paint for 1 room)'
    ]
];

generateQanvastStyleReport($userData, $budgetRange, $additionalWorks);

?>
