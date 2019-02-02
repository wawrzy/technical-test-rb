require "json"

WORKERS_STATUS = {
  medic: {
    price_per_shift: 270
  },
  interne: {
    price_per_shift: 126
  }
}

class NightShiftManager
  def initialize(filePath)
    file = File.read filePath

    @data = JSON.parse(file)
  end

  def getWorkerShifts(id)
    return @data['shifts'].find_all { |shift| shift['user_id'] == id }
  end

  def getWorkerPrice(id)
    worker = @data['workers'].find { |worker| worker['id'] == id }

    return WORKERS_STATUS[worker['status'].to_sym][:price_per_shift]
  end

  def writeJSON(data, filePath)
    File.open(filePath,'w') do |f|
      f.write(JSON.pretty_generate(data))
    end
  end

  def workersPrices(outputFile)
    output = {
      workers: []
    }

    @data['workers'].each do |worker|
      workerId = worker['id']

      workerShifts = getWorkerShifts(workerId)
      workerPrice = getWorkerPrice(workerId) * workerShifts.length

      output[:workers].push({ id: workerId, price: workerPrice })
    end

    writeJSON(output, outputFile)

    puts 'Done.'
  end

  private :getWorkerShifts, :writeJSON
end

ns = NightShiftManager.new('./data.json')

ns.workersPrices('output.json')

