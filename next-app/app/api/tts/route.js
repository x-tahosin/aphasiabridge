import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { text, apiKey, voiceId } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const elevenLabsKey = apiKey || process.env.ELEVENLABS_API_KEY;
    const voice = voiceId || 'pNInz6obpgDQGcFmaJgB'; // Adam - calm, natural male voice for Tariq

    if (elevenLabsKey) {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.85,
            style: 0.2,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        return new NextResponse(audioBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.byteLength.toString(),
            'X-TTS-Engine': 'ElevenLabs-HiFi'
          }
        });
      }
    }

    // Default: Return high-precision Web Speech API configuration
    return NextResponse.json({
      engine: 'WebSpeechAPI',
      text: text,
      recommendedVoice: 'Google US English / Samantha / Daniel',
      pitch: 1.02,
      rate: 0.94,
      volume: 1.0
    });

  } catch (err) {
    return NextResponse.json(
      { error: 'TTS processing failed', details: err.message },
      { status: 500 }
    );
  }
}
